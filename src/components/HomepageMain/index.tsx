import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import styles from '../../css/styles.module.css';

import clsx from 'clsx';
import Link from '@docusaurus/Link';

export default function HomepageMain(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <>
      <header>
        <div
          className={clsx(
            'container',
            styles.header,
            styles.flex,
            styles['flex__center'],
          )}>
          <img
            className={styles.heroLogo}
            src={siteConfig.customFields.websiteLogo as string}
          />
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className="button-group" style={{padding: 12}}>
            <Link className="button button--primary button--lg" to="/blogs">
              博客推文
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/docs/category/前端">
              技术文档
            </Link>
          </div>
        </div>
      </header>
      <div
        className={clsx(styles.more, styles.flex, styles.flex__center)}
        style={{height: '20vh'}}>
        <span>more</span>
        <span>正在建设</span>
        <span
          style={{padding: 8}}
          className={styles['more__placeholder']}></span>
      </div>
    </>
  );
}
