import React from "react"
import * as Icon from "react-feather"
const navigationConfig = [
  {
    id: "dashboard",
    title: "Dashboard",
    type: "item",
    icon: <Icon.Home size={20} />,
    badge: "warning",
    permissions: ["admin","super admin"],
    navLink: "/"
  },
  {
    type: "groupHeader",
    permissions: ["admin","super admin"],
    groupTitle: "MEDICAL MANAGEMENT"
  },
  {
    id: "doctor",
    title: "Doctors",
    type: "item",
    icon: <Icon.Mail size={20} />,
    permissions: ["admin","super admin", "editor"],
    navLink: "/app/doctor/list"
  },
  {
    id: "patient",
    title: "Patients",
    type: "item",
    icon: <Icon.MessageSquare size={20} />,
    permissions: ["admin","super admin", "editor"],
    navLink: "/app/patient/list"
  },
  {
    id: "appointments",
    title: "Appointments",
    type: "item",
    icon: <Icon.CheckSquare size={20} />,
    permissions: ["admin","super admin", "editor"],
    navLink: "/todo/:filter",
    filterBase: "/todo/all"
  },
  {
    type: "groupHeader",
    groupTitle: "Security",
    permissions: ["admin","super admin"],
  },
  {
    id: "users",
    title: "Users",
    type: "item",
    icon: <Icon.Mail size={20} />,
    permissions: ["admin","super admin", "editor"],
    navLink: "/app/user/list"
  },
  {
    id: "roles",
    title: "Roles",
    type: "item",
    icon: <Icon.MessageSquare size={20} />,
    permissions: ["admin","super admin", "editor"],
    navLink: "/app/roles"
  },
  
  {
    type: "groupHeader",
    groupTitle: "Security",
    permissions: ["system administrator"],
  },
  {
    id: "users",
    title: "Users",
    type: "item",
    icon: <Icon.Mail size={20} />,
    permissions: [ "system administrator"],
    navLink: "/app/user/list"
  },
  {
    id: "roles",
    title: "Roles",
    type: "item",
    icon: <Icon.MessageSquare size={20} />,
    permissions: ["system administrator"],
    navLink: "/app/roles"
  },
  {
    type: "groupHeader",
    groupTitle: "ACCOUNT",
    permissions: ["admin","super admin"],
  },
  {
    id: "billing",
    title: "Billing",
    type: "item",
    icon: <Icon.Mail size={20} />,
    permissions: ["admin","super admin", "editor"],
    navLink: "/app/billing",
    filterBase: "/app/billing"
  },
  {
    type: "groupHeader",
    permissions: ["admin","super admin"],
    groupTitle: "PAYMENT MANAGEMENT"
  },
  {
    id: "history",
    title: "History",
    type: "item",
    icon: <Icon.Mail size={20} />,
    permissions: ["admin","super admin", "editor"],
    navLink: "/app/history",
    filterBase: "/app/history"
  },
]

export default navigationConfig
