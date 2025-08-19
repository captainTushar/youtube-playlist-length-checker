import { NextResponse } from "next/server";

// Types for API responses
interface PlaylistSnippet {
  snippet: {
    title: string;
  };
}
interface PlaylistResponse {
  items: PlaylistSnippet[];
}

interface PlaylistItem {
  contentDetails: {
    videoId: string;
  };
}
interface PlaylistItemsResponse {
  items: PlaylistItem[];
  nextPageToken?: string;
}

interface VideoDetail {
  contentDetails: {
    duration: string;
  };
}
interface VideosResponse {
  items: VideoDetail[];
}

// Utility: parse ISO 8601 duration into seconds
function parseDuration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);
  return hours * 3600 + minutes * 60 + seconds;
}

// Utility: format seconds into h m s
function formatDuration(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}h ${m}m ${s}s`;
}

export async function POST(req: Request) {
  try {
    const { playlistId } = await req.json();
    const API_KEY = process.env.YOUTUBE_API_KEY;

    if (!playlistId || !API_KEY) {
      return NextResponse.json({ error: "Missing playlistId or API key" }, { status: 400 });
    }

    // 1️⃣ Fetch playlist title
    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${API_KEY}`
    );
    const playlistData: PlaylistResponse = await playlistRes.json();
    const playlistTitle = playlistData.items?.[0]?.snippet?.title || "Playlist";

    // 2️⃣ Fetch video IDs (all pages)
    let nextPageToken: string | undefined = undefined;
    const videoIds: string[] = [];

    do {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${playlistId}&pageToken=${nextPageToken || ""}&key=${API_KEY}`
      );
      const data: PlaylistItemsResponse = await res.json();
      videoIds.push(...data.items.map((item) => item.contentDetails.videoId));
      nextPageToken = data.nextPageToken;
    } while (nextPageToken);

    // 3️⃣ Fetch video durations in batches
    let totalSeconds = 0;
    for (let i = 0; i < videoIds.length; i += 50) {
      const batch = videoIds.slice(i, i + 50).join(",");
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${batch}&key=${API_KEY}`
      );
      const data: VideosResponse = await res.json();
      totalSeconds += data.items.reduce(
        (acc, item) => acc + parseDuration(item.contentDetails.duration),
        0
      );
    }

    // ✅ Final response
    return NextResponse.json({
      title: playlistTitle,
      totalVideos: videoIds.length,
      totalDuration: formatDuration(totalSeconds),
      totalSeconds,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch playlist" }, { status: 500 });
  }
}
