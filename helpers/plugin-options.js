const confirmOption = {
  info: (message, title = "Bilgi", button = "Tamam") => {
    return {
      title,
      message,
      button: {
        yes: button,
      },
    }
  },
  error: (message, title = "Hata", button = "Kapat") => {
    return {
      title,
      message,
      button: {
        yes: button,
      },
    }
  },
  success: (message, title = "Başarılı", button = "Tamam") => {
    return {
      title,
      message,
      button: {
        yes: button,
      },
    }
  }
}
const tableOptions = {
  defaultData: {
    search: "",
    selected: [],
    selectedModal: []
  },
  actionColumn: {
    text: "İşlem",
    value: "actions",
    width: 50,
    sortable: false,
    filterable: false
  },
}

export {
  confirmOption,
  tableOptions,
};