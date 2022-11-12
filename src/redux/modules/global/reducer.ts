import { GlobalState } from "@/redux/interface";
import { AnyAction } from "redux";
import produce from "immer";
import * as types from "@/redux/mutation-types"

const globalState: GlobalState = {
  token: "",
};

const global = (state: GlobalState = globalState, action: AnyAction) =>
  produce(state, (draftState) => {
    switch (action.type) {
      case types.SET_TOKEN:
        draftState.token = action.token;
    }
  });

  export default global;