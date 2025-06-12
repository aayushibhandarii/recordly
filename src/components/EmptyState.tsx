import { Video } from "lucide-react";

export default function EmptyState({title,description}:{title : string,description : string}){
    return(
        <div className="empty-state shadow-10 border border-shadow">
            <figure className="bg-iconbg text-brown rounded-2xl p-3">
                <Video  size={30} / >
            </figure>
            <h1>
                {title}
            </h1>
            <p>
                {description}
            </p>
        </div>
    )
}