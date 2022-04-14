import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  // {
  //   title: 'Easy to Use',
  //   Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
  //   description: (
  //     <>
  //       Docusaurus was designed from the ground up to be easily installed and
  //       used to get your website up and running quickly.
  //     </>
  //   ),
  // },
  // {
  //   title: 'Focus on What Matters',
  //   Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
  //   description: (
  //     <>
  //       Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
  //       ahead and move your docs into the <code>docs</code> directory.
  //     </>
  //   ),
  // },
  {
    title: '关于本站',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        本站点是使用 Facebook 开源的 Docusaurus 构建的。
        <br/>
        <a href='./关于本站'>如何构建一个类似的站点。</a>
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
