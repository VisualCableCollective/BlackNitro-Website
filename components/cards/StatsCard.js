import {Card} from "./Card";

export function StatsCard({title, description, icon}) {
    return (
        <Card className="flex justify-between items-center">
            <div>
                <h1 className="text-4xl">{title}</h1>
                <h1 className="text-white text-opacity-60 mt-1 pr-6">{description}</h1>
            </div>
            <div className="text-6xl">
                {icon}
            </div>
        </Card>
    );
}