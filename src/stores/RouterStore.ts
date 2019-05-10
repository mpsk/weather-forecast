import { createBrowserHistory } from "history";
import { RouterStore as MobxRouterStore, syncHistoryWithStore, SynchronizedHistory } from "mobx-react-router";

export class RouterStore extends MobxRouterStore {
  static initHistory(router: RouterStore): SynchronizedHistory {
    const browserHistory = createBrowserHistory();
    return syncHistoryWithStore(browserHistory, router);
  }
}
