import {
  getNewsfeedData,
  getNewsfeedFileMetadata,
} from "@/cms/get-newsfeed-data";
import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { title, date, image } = await getNewsfeedFileMetadata(slug);

  const avatarElement = (
    <img
      src="https://picsum.photos/300/300"
      alt=""
      width={300}
      height={300}
      style={{
        position: "absolute",
        top: 40,
        right: 40,
        width: 300,
        height: 300,
        borderRadius: "50%",
        objectFit: "cover",
        border: "4px solid white",
      }}
    />
  );
  if (!image) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 40,
            background: "linear-gradient(45deg, #f3ec78, #af4261)",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.6)",
              padding: 40,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              maxWidth: "80%",
            }}
          >
            <h1
              style={{
                fontSize: 48,
                fontWeight: 700,
                color: "#1a1a1a",
                lineHeight: 1.2,
                textAlign: "center",
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: 24,
                color: "#4a4a4a",
                textAlign: "center",
              }}
            >
              {date.toString()}
            </p>
          </div>
          {avatarElement}
        </div>
      )
    );
  }
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
        }}
      >
        <img
          src={`http://localhost:3000${image}`}
          alt={title}
          width={1200}
          height={630}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: 40,
            background: "rgba(255, 255, 255, 0.6)",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <h1
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "#1a1a1a",
              lineHeight: 1.2,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: 24,
              color: "#000",
            }}
          >
            {new Date(date).toLocaleDateString("pl-PL", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        {avatarElement}
      </div>
    )
  );
}

export async function generateStaticParams() {
  const newsfeedData = await getNewsfeedData();
  return newsfeedData.map(({ path }) => ({ slug: path }));
}
