// Stories are how Playwright integration tests mount things. They live
// next to the specs that mount them. Each named export is one scenario;
// the id is the file's path under __tests__/ plus the export name — this
// one is mount('App/Default').
import { App } from '../src/App';

export const Default = () => <App />;
