# Create monorepo 
npx create-nx-workspace<br/>
cd qualyteeth

## Ionic app:
npm install --save-dev --exact @nxtend/ionic-angular<br/>
<!-- nx generate @nxtend/ionic-angular:init -->
nx generate @nxtend/ionic-angular:application qualyteeth-dentist<br/>
nx generate @nxtend/ionic-angular:application qualyteeth-patient<br/>
nx generate @nxtend/ionic-angular:application qualyteeth-web<br/>

## Node app:
npm install -D @nrwl/node<br/>
nx generate @nrwl/node:application qualyteeth-server<br/>


# Add page with ionic
npm i @ionic/angular-toolkit (if not installed yet)<br>
nx g @ionic/angular-toolkit:page pages/settings/services/link-dentist --project=qualyteeth-dentist


# Build

## Qualyteeth-server

nx build qualyteeth-server<br>
cp <code>.env</code> file to <i>dist</i> folder

## Qualyteeth-dentist / qualyteeth-patient
nx build qualyteeth-dentist<br>
nx build qualyteeth-patient<br>
# qualyteeth
