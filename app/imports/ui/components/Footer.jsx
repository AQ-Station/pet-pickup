import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    return (
      <div className="full-background">
        <footer>
          <div style={divStyle} className="ui center aligned container">
            <hr />
              AQ-Station <br />
              HACC 2021<br />
            <a href="https://github.com/AQ-Station/pet-pickup">GitHub Repo Page</a>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
