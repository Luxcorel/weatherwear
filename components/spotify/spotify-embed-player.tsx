"use client";

type Props = {
    readonly mediaId: string;
    readonly mediaType: "playlist" | "album" | "track" | "show";
};

export default function SpotifyEmbedPlayer(props: Props) {
    return (
        // eslint-disable-next-line react/iframe-missing-sandbox
        <iframe
            src={`https://open.spotify.com/embed/${props.mediaType}/${props.mediaId}?utm_source=generator`}
            width="100%"
            height="400px"
            style={{ borderRadius: 12 }}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
        />
    );
}
