/* @flow */
import React from 'react';

export default class Html extends React.Component<*> {

  render() {
    const { children, count } = this.props;
    return (
      <html lang="ja">
        <head>
          <meta charSet="UTF-8" />
          <title>Counter</title>
        </head>
        <body>
          <div id="app">{children}</div>
          <script type="text/plain" id="initial-data" data-json={JSON.stringify({count})}></script>
          <script src="bundle.js"></script>
        </body>
      </html>
    );
  }

}
