import { GlobalState } from "@/redux/interface";
import { AnyAction } from "redux";
import persistCombineReducers from "redux-persist/es/persistCombineReducers";
import produce from "immer";

const globalState: GlobalState = {
  token: "",
};

const global = (state: GlobalState = globalState, action: AnyAction) =>
  produce(state, (draftState) => {
    switch (action.type) {
    }
  });
