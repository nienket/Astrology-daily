import React, { Component } from "react";
import PropTypes from "prop-types";
import Tab from "./tab";
import styles from "./Tabs.module.css";
// import logo from "../../../../assets/images/logos/logo-black-3.png";
import HeaderAdmin from "./../header/index";
import { Link } from "react-router-dom";
// import Header from "../../../../components/header";
// import { useIsLogin } from "../../../../hooks/useIsLogin";
class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.children[0].props.label,
      formComment: false,
      isHeart: false,
    };
  }

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab });
  };

  render() {
    const {
      onClickTabItem,
      props: { children },
      state: { activeTab },
    } = this;

    return (
      <>
        <nav className={styles.tabs}>
          <div className={styles.logo}>
            <Link to="/">
              <h2 style={{ color: "#fe7f5c", fontFamily: "Philosopher" }}>
                Astrologer Home
              </h2>
            </Link>
          </div>
          <ul>
            {children.map((child) => {
              const { label, Icon } = child.props;
              return (
                <Tab
                  activeTab={activeTab}
                  key={label}
                  label={label}
                  onClick={onClickTabItem}
                  Icon={Icon}
                />
              );
            })}
          </ul>
        </nav>
        <section className={styles.dashboard_part}>
          <HeaderAdmin />
          <div className={styles.main_content}>
            {children.map((child) => {
              if (child.props.label !== activeTab) return undefined;
              return child.props.children;
            })}
          </div>
        </section>
      </>
    );
  }
}

export default Tabs;
