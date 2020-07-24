import React, { PureComponent } from "react";
import classnames from "classnames";
import Sidebar from "./components/menu/vertical-menu/Sidebar";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { connect } from "react-redux";
import { NavLink  } from "react-router-dom"
import Input from "../components/Input";
import logo from '../assets/img/logo.png'
import { request } from "../utils";
import { setUserData, logout } from "../redux/actions/auth/loginActions";
class VerticalLayout extends PureComponent {
  state = {
    width: window.innerWidth,
    sidebarHidden: false,
    currentLang: "en",
    appOverlay: false,
    customizer: false,
    currRoute: this.props.location.pathname
  };
  collapsedPaths = [];
  mounted = false;
  updateWidth = () => {
    if (this.mounted) {
      this.setState(prevState => ({
        width: window.innerWidth
      }));
    }
  };

  handleCustomizer = bool => {
    this.setState({
      customizer: bool
    });
  };

  componentDidMount() {
    request('/api/user').then((d) => {
      this.props.setUserData(d);
    })
    /* this.mounted = true;
    let {
      location: { pathname },
      app: {
        customizer: { theme, direction }
      }
    } = this.props;

    if (this.mounted) {
      if (window !== "undefined") {
        window.addEventListener("resize", this.updateWidth, false);
      }
      if (this.collapsedPaths.includes(pathname)) {
        this.props.collapseSidebar(true);
      }

      let layout = theme;
      let dir = direction;
      if (dir === "rtl")
        document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
      else document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");
      return layout === "dark"
        ? document.body.classList.add("dark-layout")
        : layout === "semi-dark"
        ? document.body.classList.add("semi-dark-layout")
        : null;
    } */
  }

  componentDidUpdate(prevProps, prevState) {
    /* let {
      location: { pathname },
      app: {
        customizer: { theme, sidebarCollapsed }
      }
    } = this.props;

    let layout = theme;
    if (this.mounted) {
      if (layout === "dark") {
        document.body.classList.remove("semi-dark-layout");
        document.body.classList.add("dark-layout");
      }
      if (layout === "semi-dark") {
        document.body.classList.remove("dark-layout");
        document.body.classList.add("semi-dark-layout");
      }
      if (layout !== "dark" && layout !== "semi-dark") {
        document.body.classList.remove("dark-layout", "semi-dark-layout");
      }

      if (
        prevProps.app.customizer.sidebarCollapsed !==
        this.props.app.customizer.sidebarCollapsed
      ) {
        this.setState({
          collapsedContent: sidebarCollapsed,
          sidebarState: sidebarCollapsed
        });
      }
      if (
        prevProps.app.customizer.sidebarCollapsed ===
          this.props.app.customizer.sidebarCollapsed &&
        pathname !== prevProps.location.pathname &&
        this.collapsedPaths.includes(pathname)
      ) {
        this.props.collapseSidebar(true);
      }
      if (
        prevProps.app.customizer.sidebarCollapsed ===
          this.props.app.customizer.sidebarCollapsed &&
        pathname !== prevProps.location.pathname &&
        !this.collapsedPaths.includes(pathname)
      ) {
        this.props.collapseSidebar(false);
      }
    } */
  }

  handleCollapsedMenuPaths = item => {
    let collapsedPaths = this.collapsedPaths;
    if (!collapsedPaths.includes(item)) {
      collapsedPaths.push(item);
      this.collapsedPaths = collapsedPaths;
    }
  };

  toggleSidebarMenu = val => {
    this.setState({
      sidebarState: !this.state.sidebarState,
      collapsedContent: !this.state.collapsedContent
    });
  };

  sidebarMenuHover = val => {
    this.setState({
      sidebarState: val
    });
  };

  handleSidebarVisibility = () => {
    if (this.mounted) {
      if (window !== undefined) {
        window.addEventListener("resize", () => {
          if (this.state.sidebarHidden) {
            this.setState({
              sidebarHidden: !this.state.sidebarHidden
            });
          }
        });
      }
      this.setState({
        sidebarHidden: !this.state.sidebarHidden
      });
    }
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  handleCurrentLanguage = lang => {
    this.setState({
      currentLang: lang
    });
  };

  handleAppOverlay = value => {
    if (value.length > 0) {
      this.setState({
        appOverlay: true
      });
    } else if (value.length < 0 || value === "") {
      this.setState({
        appOverlay: false
      });
    }
  };

  handleAppOverlayClick = () => {
    this.setState({
      appOverlay: false
    });
  };

  logout = () => {
    request('/api/logout').then((d) => {
      this.props.logout()
    })
  }

  render() {
    /* let appProps = this.props.customizer;
    let menuThemeArr = [
      "primary",
      "success",
      "danger",
      "info",
      "warning",
      "dark"
    ];
    let sidebarProps = {
      toggleSidebarMenu: this.props.collapseSidebar,
      toggle: this.toggleSidebarMenu,
      sidebarState: this.state.sidebarState,
      sidebarHover: this.sidebarMenuHover,
      sidebarVisibility: this.handleSidebarVisibility,
      visibilityState: this.state.sidebarHidden,
      activePath: this.props.match.path,
      collapsedMenuPaths: this.handleCollapsedMenuPaths,
      currentLang: this.state.currentLang,
      activeTheme: appProps.menuTheme,
      collapsed: this.state.collapsedContent,
      permission: this.props.permission,
      deviceWidth: this.state.width
    };
    let navbarProps = {
      toggleSidebarMenu: this.toggleSidebarMenu,
      sidebarState: this.state.sidebarState,
      sidebarVisibility: this.handleSidebarVisibility,
      currentLang: this.state.currentLang,
      changeCurrentLang: this.handleCurrentLanguage,
      handleAppOverlay: this.handleAppOverlay,
      appOverlayState: this.state.appOverlay,
      navbarColor: appProps.navbarColor,
      navbarType: appProps.navbarType
    };

    let footerProps = {
      footerType: appProps.footerType,
      hideScrollToTop: appProps.hideScrollToTop
    };

    let customizerProps = {
      customizerState: this.state.customizer,
      handleCustomizer: this.handleCustomizer,
      changeMode: this.props.changeMode,
      changeNavbar: this.props.changeNavbarColor,
      changeNavbarType: this.props.changeNavbarType,
      changeFooterType: this.props.changeFooterType,
      changeMenuTheme: this.props.changeMenuColor,
      collapseSidebar: this.props.collapseSidebar,
      hideScrollToTop: this.props.hideScrollToTop,
      activeMode: appProps.theme,
      activeNavbar: appProps.navbarColor,
      navbarType: appProps.navbarType,
      footerType: appProps.footerType,
      menuTheme: appProps.menuTheme,
      scrollToTop: appProps.hideScrollToTop,
      sidebarState: appProps.sidebarCollapsed
    }; */
    return (
      <div className="app">
        <div className="header">
          <div className="logo">
            <img src={logo}/>
          </div>
          <div className="userInfo">
            <div>{this.props.user.name}</div>
            <div onClick={this.logout}>Salir</div>
          </div>
        </div>
        <div className="menu">
          <NavLink to="/" strict={true} exact className="menu-item" activeClassName="selected">
            AGENDA
          </NavLink>
          <NavLink to="/administration" className="menu-item" activeClassName="selected">
            ADMINISTRACION
          </NavLink>
          <NavLink to="/patients" className="menu-item" activeClassName="selected">
          PACIENTES
          </NavLink>
          <NavLink to="/crm" className="menu-item" activeClassName="selected">
          CRM
          </NavLink>
          <NavLink to="/cash" className="menu-item" activeClassName="selected">
          CAJA
          </NavLink>
          <NavLink to="/reports" className="menu-item" activeClassName="selected">
          REPORTES
          </NavLink>
        </div>
        <div className="content-wrap">
          {this.props.children}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    //app: state.customizer
    user: state.auth.login.user
  };
};


export default connect(mapStateToProps, {
  setUserData,
  logout
})(VerticalLayout);
