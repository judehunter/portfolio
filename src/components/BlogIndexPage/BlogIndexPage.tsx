import tw from 'twin.macro';
import {ArticleCard} from '../ArticleCard';
import {usePageProps} from '../../misc/common';
import BlogIndexPageExport from '../../pages/blog';
import {Footer} from '../Footer';
import {NavBar} from '../NavBar';
import {SubscribeCTA} from '../ArticlePage/SubscribeCTA';
import {LazyMotion} from 'framer-motion';
import {CookieBanner} from '../CookieBanner';

export const BlogIndexPage = () => {
  const {posts} = usePageProps<typeof BlogIndexPageExport>();

  const entries = posts
    .sort(
      (a, b) =>
        new Date(b.source.frontmatter!.createDate).getTime() -
        new Date(a.source.frontmatter!.createDate).getTime(),
    )
    .map((x) => ({
      title: x.source.frontmatter!.title,
      image: x.source.frontmatter!.thumbnail,
      tags: (x.source.frontmatter!.tags as any as string[]).map((x) => x!),
      url: x.url,
      imageBlur: x.thumbnailBlurDataUrl,
      slug: x.slug,
    }));

  const tileStyles = tw`
    [& a]:(text-[red])
  `;

  const bigTileStyles = [
    tileStyles,
    tw`
      [& .thumbnail]:(md:aspect-ratio[4 / 2])
      [& h1]:(md:text-3xl text-2xl)
      [& h2]:(text-lg)
    `,
  ];

  return (
    <>
      <LazyMotion
        features={() =>
          import('../ArticlePage/motionFeatures').then((res) => res.default)
        }
        strict
      >
        <div tw="background-color[#000212] min-h-screen text-[#dadfe7]">
          <NavBar />
          <div tw="pt-36"></div>
          <div tw="flex justify-center pt-[0.3px]">
            <SubscribeCTA />
          </div>
          <main tw="pb-[100px] mt-[50px] grid md:grid-template-columns[repeat(4, 1fr)] grid-template-columns[repeat(1, 1fr)] gap[50px 30px] max-w-[1300px] px-6 mx-auto">
            <ArticleCard
              tw="md:grid-column[1 / 3]"
              css={bigTileStyles}
              {...entries[0]}
            />
            <ArticleCard
              tw="md:grid-column[3 / 5]"
              css={bigTileStyles}
              {...entries[1]}
            />
            {entries.slice(2).map((x, i) => (
              <ArticleCard
                //   tw="
                //   width[100%]
                //   [@media (min-width: 600px)]:(
                //     width[50%]
                //   )
                //   [@media (min-width: 800px)]:(
                //     width[29%]
                //   )
                //   [@media (min-width: 1160px)]:(
                //     width[min(23%, 300px)]
                //   )
                // "
                //   css={[
                //     i === 2 &&
                //       css`
                //         display: none;
                //         @media (min-width: 800px) {
                //           display: flex;
                //         }
                //       `,
                //     i === 3 &&
                //       css`
                //         display: none;
                //         @media (min-width: 1160px) {
                //           display: flex;
                //         }
                //       `,
                //   ]}
                key={i}
                {...x}
              />
            ))}
          </main>
          <Footer />
        </div>
        {/* <CookieBanner /> */}
      </LazyMotion>
    </>
  );
};
