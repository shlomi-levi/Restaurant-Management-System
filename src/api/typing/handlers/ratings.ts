import * as dto from "../requests/ratings";
import Handler from "./utils";

interface ratingsInterface {
    handleNewRating: Handler<dto.addRatingBodyDTO>;
}

export default ratingsInterface;
