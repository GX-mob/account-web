import Router from "next/router";
import { observable, action } from "mobx";

import { STORE_TOKEN_KEY, STORE_ACCOUNT_KEY } from "../constants";
import App from "./app";
import { auth } from "../api";
import AccountState from "./account";

class DashboardState {
  @observable initialized = false;
  @observable token = false;
  @observable panel = "account";

  @action setPanel(panel) {
    this.panel = panel;
  }

  @action async init(token) {
    try {
      this.token = token || (await App.storage.getItem(STORE_TOKEN_KEY));
      if (this.token) await AccountState.hydrate();
    } catch (e) {
      console.error(e);
    } finally {
      this.initialized = true;
    }
  }

  async hasToken() {
    return this.token || (await App.storage.getItem(STORE_TOKEN_KEY));
  }

  @action async logout() {
    const { ok, data } = await auth.unsign();

    if (!ok) {
      return console.error(data);
    }

    await App.storage.removeItem(STORE_TOKEN_KEY);
    await App.storage.removeItem(STORE_ACCOUNT_KEY);

    this.token = false;

    Router.push("/");
  }
}

export default new DashboardState();
