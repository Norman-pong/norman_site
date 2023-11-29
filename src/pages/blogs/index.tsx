import Layout from '@theme/Layout';
import Tag from '@theme/Tag';
import type {BlogPost, BlogTag} from '@docusaurus/plugin-content-blog';
import useGlobalData from '@docusaurus/useGlobalData';
import styles from './style.module.css';
import clsx from 'clsx';
import BlogPostItem from './BlogPostItem';

type CustomBlogPostData = {
  blogs: BlogPost[] | [];
  tags: BlogTag[] | [];
};

function Tags({tags}: {tags: BlogTag[]}) {
  return (
    <ul className={clsx(styles.tags, 'padding--none', 'margin-left--sm')}>
      {tags.map(({label, permalink: tagPermalink}) => (
        <li key={tagPermalink} className={styles.tag}>
          <Tag label={label} permalink={tagPermalink} />
        </li>
      ))}
    </ul>
  );
}

export default function Blogs(): JSX.Element {
  const globalData = useGlobalData();
  const blogPluginData = globalData?.['docusaurus-plugin-content-blog']?.[
    'CustomBlog01'
  ] as CustomBlogPostData;
  const {blogs, tags} = blogPluginData;
  const tagsArray = Object.values(tags);
  return (
    <Layout>
      <div className={clsx('flex flex__center', styles.post)}>
        <Tags tags={tagsArray} />
        {blogs.map((i: BlogPost) => (
          <BlogPostItem {...i} />
        ))}
      </div>
    </Layout>
  );
}
