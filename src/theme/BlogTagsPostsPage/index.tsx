import React from 'react';
import clsx from 'clsx';
import Translate, {translate} from '@docusaurus/Translate';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
  usePluralForm,
} from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import SearchMetadata from '@theme/SearchMetadata';
import type {Props} from '@theme/BlogTagsPostsPage';
import Unlisted from '@theme/Unlisted';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import BlogPostItem from '../../pages/blogs/BlogPostItem';

function useBlogPostsPlural() {
  const {selectMessage} = usePluralForm();
  return (count: number) =>
    selectMessage(
      count,
      translate(
        {
          id: 'theme.blog.post.plurals',
          description:
            'Pluralized label for "{count} posts". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: 'One post|{count} posts',
        },
        {count},
      ),
    );
}

function useBlogTagsPostsPageTitle(tag: Props['tag']): string {
  const blogPostsPlural = useBlogPostsPlural();
  return translate(
    {
      id: 'theme.blog.tagTitle',
      description: 'The title of the page for a blog tag',
      message: '{nPosts} tagged with "{tagName}"',
    },
    {nPosts: blogPostsPlural(tag.count), tagName: tag.label},
  );
}

function BlogTagsPostsPageMetadata({tag}: Props): JSX.Element {
  const title = useBlogTagsPostsPageTitle(tag);
  return (
    <>
      <PageMetadata title={title} />
      <SearchMetadata tag="blog_tags_posts" />
    </>
  );
}

function BlogTagsPostsPageContent({
  tag,
  items,
  sidebar,
  listMetadata,
}: Props): JSX.Element {
  const title = useBlogTagsPostsPageTitle(tag);
  return (
    <Layout>
      <div className={clsx('flex flex__center')} style={{padding: '1rem'}}>
        {tag.unlisted && <Unlisted />}
        <header className="margin-bottom--xl">
          <Heading as="h2">{title}</Heading>
          <Link href={tag.allTagsPath}>
            <Translate
              id="theme.tags.tagsPageLink"
              description="The label of the link targeting the tag list page">
              View All Tags
            </Translate>
          </Link>
        </header>
        {items.map((i: any) => (
          <BlogPostItem {...i.content} />
        ))}
      </div>
    </Layout>
  );
}
export default function BlogTagsPostsPage(props: Props): JSX.Element {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogTagPostListPage,
      )}>
      <BlogTagsPostsPageMetadata {...props} />
      <BlogTagsPostsPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
