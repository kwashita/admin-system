import ReactDOM from "react-dom/client";
import Loading from "@/components/Loading";

let needLoadingRequestCount = 0;

export const showFullScreenLoading = () => {
  if (needLoadingRequestCount === 0) {
    let dom = document.createElement("div");
    dom.setAttribute("id", "loading");
    document.body.appendChild(dom);
    ReactDOM.createRoot(dom).render(<Loading />);
  }
  needLoadingRequestCount++;
};
