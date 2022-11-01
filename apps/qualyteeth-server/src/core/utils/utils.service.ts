import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {

    /**
     *
     */
    // public replaceProperty(o: any, oldKey: any, newKey: any) {
    //     o[newKey] = o[oldKey];
    //     delete o[oldKey];
    //     return o;
    // }

    /**
     *
     */
    public snakeToCamel(s: string) {
        return s.replace(/(\_\w)/g, function (m) { return m[1].toUpperCase(); });
    }

    /**
     *
     */
    public snakeCaseToCamelCase(o: any): any {
        Object.keys(o).forEach(k => {
            if (o[k] instanceof Array) {
                o[k].forEach(u => u = this.snakeCaseToCamelCase(u));
            }

            if (k.indexOf('_') === -1) {
                return;
            }
            const newKey = this.snakeToCamel(k);
            o[newKey] = o[k];
            delete o[k];
        });
        return o;
    }
}
