import {default as blogPlugin} from '@docusaurus/plugin-content-blog';
import type {BlogPost, BlogTag} from '@docusaurus/plugin-content-blog';

async function blogPluginEnhanced(context, options) {
  const blogPluginInstance = await blogPlugin(context, options);

  return {
    ...blogPluginInstance,
    async contentLoaded({content, allContent, actions}) {
      // Create default plugin pages
      await blogPluginInstance.contentLoaded({content, allContent, actions});

      // Create your additional pages
      const {blogPosts, blogTags} = content;
      const {setGlobalData} = actions;

      setGlobalData({
        blogs: blogPosts as BlogPost,
        tags: blogTags as BlogTag,
      });
    },
  };
}

export default Object.assign({}, blogPlugin, {
  default: blogPluginEnhanced,
});
