import { loadGoogleFont } from '@/lib/loadGoogleFont';
import { getClient } from '@/lib/sanity.client';
import { getPost } from '@/lib/sanity.queries';
import { ImageResponse } from 'next/server';

/* 参考：OG画像を生成する(https://commte.net/nextjs-vercel-og) */

/** ImageResponse対応 */
export const runtime = 'edge';
/** 有効期間 */
export const revalidate = 10;

/** 13.3.0現在ここを動的にはできない */
export const alt = '記事のアイキャッチ画像';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

type Props = {
  params: { slug: string };
};

export default async function og({ params: { slug } }: Props) {
  const notoSansArrayBuffer = await loadGoogleFont({
    family: 'Noto Sans JP',
    weight: 700,
  });
  const dotGothic16ArrayBuffer = await loadGoogleFont({
    family: 'DotGothic16',
    weight: 400,
  });

  const client = getClient()
  const post = await getPost(client, slug)

  if (post) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 64,
            background: 'white',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'NotoSansJP',
          }}
        >
          {post.title}
        </div>
      ),
      {
        ...size,
        fonts: [
          {
            name:'DotGothic16',
            data: dotGothic16ArrayBuffer,
            style: 'normal',
            weight: 400,
          },
          {
            name: 'NotoSansJP',
            data: notoSansArrayBuffer,
            style: 'normal',
            weight: 700,
          },
        ],
      }
    );
  } else {
    return new Response('Not Found', { status: 404 });
  }
}
