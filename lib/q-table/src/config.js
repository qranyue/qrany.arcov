const CONFIG = {
  forms: {},
  renders: {},
};

export const pushForm = (forms) => {
  Object.assign(CONFIG.forms, forms);
};

export const getForm = () => CONFIG.forms;

export const pushRender = (renders) => {
  Object.assign(CONFIG.renders, renders);
};

export const getRender = () => CONFIG.renders;
