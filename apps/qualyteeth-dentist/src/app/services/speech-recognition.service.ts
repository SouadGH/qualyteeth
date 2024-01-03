import { Inject, Injectable, NgZone, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { similarity } from 'talisman/metrics/dice';

const DEFAULT_GRAMMAR = `#JSGF V1.0; grammar Digits;
public <Digits> = ( <digit> ) + ;
<digit> = ( zero | one | two | three | four | five | six | seven | eight | nine );`;

class Message {
  success?: boolean;
  error?: boolean;
  messages: Array<string>;
}

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService implements OnDestroy {

  recognition?: any;
  message: Subject<Message>;
  command: Subject<{ context: string, command: string }> = new Subject();
  // commands: { [context: string]: any } = {};
  context: BehaviorSubject<string> = new BehaviorSubject('');
  refreshGrammar: BehaviorSubject<boolean> = new BehaviorSubject(false);
  started: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private _destroyed = new Subject<void>();

  /**
   *
   */
  constructor(
    private zone: NgZone,
    // @Inject('SPEECH_LANG') public lang: string,
  ) {
    if (window['SpeechRecognition'] || window['webkitSpeechRecognition']) {
      this.init();
    }
  }

  /**
   *
   */
  init() {
    // if (!window['SpeechRecognition'] && !window['webkitSpeechRecognition']) {
    //   console.error('No speech service available!')
    //   return;
    // }

    this.message = new Subject();

    const speechRecognition = window['SpeechRecognition'] || window['webkitSpeechRecognition'];
    this.recognition = new speechRecognition();
    this.recognition.lang = 'fr-CH';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 10;
    this.recognition.continuous = true;

    this.recognition.onresult = event => {
      // console.log(event)
      let message: Message = { messages: [''] };
      if (event.results) {
        const result: SpeechRecognitionResult = event.results[event.resultIndex];
        if (result.isFinal) {
          if (result[0].confidence < 0.3) {
            message = { error: true, messages: ['Cannot recognize'] };
          } else {
            const words: Array<string> = new Array<string>();
            for (let i = 0; i < result.length; i++) {
              if (result[i].confidence < 0.3) {
                break;
              }
              const word = result[i].transcript.trim().toLowerCase();
              words.push(word);
            }
            message = { success: true, messages: words };
          }
        }
      }
      this.zone.run(() => {
        if (message['error']) {
          this.message.error(message);
        } else {
          this.message.next(message);
          // const context = this.getContextForWord(word);
          // if (context) {
          //   this.context.next(context);
          // } else {
          //   const isCommand = this.commands[this.context.value] && this.commands[this.context.value][word];
          //   if (isCommand) {
          //     this.command.next({ context: this.context.value, command: word });
          //   } else {
          //     // try to match a global context command
          //     const isGlobalCommand = this.commands[''] && this.commands[''][word];
          //     if (isGlobalCommand) {
          //       this.command.next({ context: '', command: word });
          //     }
          //   }
          // }
        }
      });
    };
    this.recognition.onerror = error => {
      this.zone.run(() => {
        console.log(`Speech error: ${error.error}`);
        this.stop();
        this.message.error(error.error);
      });
    };
    this.recognition.onstart = () => {
      this.zone.run(() => {
        console.log('Speech started')
        this.started.next(true);
      });
    };
    this.recognition.onend = () => {
      this.zone.run(() => {
        console.log('Speech ended');
        this.started.next(false);
        // this.message.error('speech-ended');
      });
    };
    this.recognition.onsoundend = () => {
      this.zone.run(() => {
        console.log('Sound ended');
        this.started.next(false);
        this.message.error('sound-ended');
      });
    };

    this.refreshGrammar.pipe(
      takeUntil(this._destroyed),
      debounceTime(500)
    ).subscribe(() => {
      this.setGrammar();
    });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  start(): void {
    if (!this.started.getValue() && !!this.recognition) {
      console.log('Starting speech recognition');
      this.recognition.start();
    }
  }

  stop(): void {
    if (this.started.getValue() && !!this.recognition) {
      console.log('Stopping speech recognition');
      this.recognition.stop();
      this.recognition = null;
      this.started.next(false);
    }
  }

  // declareContext(context: string[]): void {
  //   const contextKey = context.map(w => w.toLowerCase()).join('/');
  //   if (!this.commands[contextKey]) {
  //     this.commands[contextKey] = {};
  //   }
  //   this.refreshGrammar.next(true);
  // }

  // declareCommand(command, context): void {
  //   const contextKey = context.map(w => w.toLowerCase()).join('/');
  //   if (!this.commands[contextKey]) {
  //     this.commands[contextKey] = {};
  //   }
  //   this.commands[contextKey][command.toLowerCase()] = true;
  //   this.refreshGrammar.next(true);
  // }

  // setContext(context: string[]): void {
  //   const contextKey = context.map(w => w.toLowerCase()).join('/');
  //   this.context.next(contextKey);
  // }

  // getContextForWord(word: string): string | null {
  //   // first try to match a subcontext of the current context
  //   const context = this.context.value ? this.context.value + '/' + word : word;
  //   if (this.commands[context]) {
  //     return context;
  //   }
  //   // then try top-level context
  //   if (this.commands[word]) {
  //     return word;
  //   }
  //   return null;
  // }

  /**
   *
   */
  private setGrammar(): void {
    const SpeechGrammarList = window['SpeechGrammarList'] || window['webkitSpeechGrammarList'];
    if (!!SpeechGrammarList && !!this.recognition) {
      const words = {};
      // Object.keys(this.commands).forEach(context => {
      //   context.split('/').forEach(word => {
      //     words[word] = true;
      //   });
      //   Object.keys(this.commands[context]).forEach(command => words[command] = true);
      // });
      const grammar = DEFAULT_GRAMMAR + ' public <command> = ' + Object.keys(words).join(' | ') + ' ;';
      const speechRecognitionList = new SpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 1);
      this.recognition.grammars = speechRecognitionList;
    }
  }

  /**
   *
   */
  public maxSimilarities(input: Array<string>, words: Array<string>, simThreshold: number = 0.5): string {
    const similarities = {};
    words.forEach(w => {
      similarities[w] = Math.max(...input.map((a: string) => (similarity(a, w))));
    })

    console.log(similarities)
    const maxKey = Object.keys(similarities).reduce((a, b) => similarities[a] > similarities[b] ? a : b);
    if (similarities[maxKey] < simThreshold) {
      return null;
    }
    return maxKey
  }

  /**
   *
   */
  public matches(input: string, words: Array<string>, simThreshold: number = 0.5): boolean {
    return this.maxSimilarities([input], words, simThreshold) != null;
  }
}
