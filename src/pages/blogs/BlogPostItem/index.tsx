import type {
  BlogPost,
  PropBlogPostContent,
} from '@docusaurus/plugin-content-blog';
import Link from '@docusaurus/Link';
import {useWidthEffectLayout} from '@site/src/hooks/useWidthEffectLayout';
import clsx from 'clsx';
import {usePluralForm} from '@docusaurus/theme-common';
import {translate} from '@docusaurus/Translate';
import styles from './style.module.css';
import TagsListInline from '@theme/TagsListInline';
import NotFound from '@theme/Unlisted';

function useReadingTimePlural() {
  const {selectMessage} = usePluralForm();
  return (readingTimeFloat: number) => {
    const readingTime = Math.ceil(readingTimeFloat);
    return selectMessage(
      readingTime,
      translate(
        {
          id: 'theme.blog.post.readingTime.plurals',
          description:
            'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: 'One min read|{readingTime} min read',
        },
        {readingTime},
      ),
    );
  };
}

function ReadingTime({readingTime}: {readingTime: number}) {
  const readingTimePlural = useReadingTimePlural();
  return <>{readingTimePlural(readingTime)}</>;
}

function PostCover({cover, className}: {cover: string; className?: string}) {
  return (
    cover && <img className={clsx(styles.post__cover, className)} src={cover} />
  );
}

export default function BlogPostItem(
  blog: BlogPost | PropBlogPostContent,
): JSX.Element {
  if (!blog.metadata) return <NotFound />;
  const cover = blog.metadata?.frontMatter?.cover as string;
  const {title, readingTime, formattedDate, description, tags, permalink} =
    blog.metadata;
  const windowSize = useWidthEffectLayout();

  return (
    <Link className={styles.post__content} to={`${permalink}`}>
      <div className={styles.post__header}>
        {windowSize === 'small' && (
          <>
            <div className="flex-1" style={{marginBottom: '1rem'}}>
              <PostCover cover={cover} />
            </div>
          </>
        )}
        <h1>{title}</h1>
        <p>
          {formattedDate} · <ReadingTime readingTime={readingTime} />
        </p>
      </div>
      <div className={clsx('flex', styles.post__description)}>
        <div className="flex__col--between flex-2">
          <div className={clsx(styles.post__descriptionContent)}>
            {description}
          </div>
          {tags.length > 0 && (
            <div style={{marginTop: 24}}>
              <TagsListInline tags={tags} />
            </div>
          )}
        </div>
        {windowSize !== 'small' && (
          <>
            <div className="flex-1" style={{marginLeft: '1rem'}}>
              <PostCover cover={cover} />
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
