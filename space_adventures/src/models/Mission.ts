import { ObjectId } from "mongodb";

interface Mission {
    _id?: ObjectId;
    missionName: string;
    astronaut: string;
    status: "Planned" | "Launched" | "Completed";
    successfulLanding: number;

}

export default Mission;