"use client";

export default function SpotifyEmbedPlayer(props: { readonly magicId: string }) {
    return (
        // eslint-disable-next-line react/iframe-missing-sandbox
        <iframe
            src={`https://open.spotify.com/embed/playlist/${props.magicId}?utm_source=generator`}
            width="100%"
            height="400px"
            style={{ borderRadius: 12 }}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
        />
    );
}
