const apiCallFn = async (url, config={}) => {
  // console.log(url);
  const options = {
    method: 'GET',
    headers: {
      ...(config.headers || {}),
    },
  };

  if (config.params) {
    const params = new URLSearchParams({
      ...config.params,
    });
    url = `${url}?${params}`;
    // console.log(url);
  }

  if (config.method) {
    options.method = config.method;
    if (config.method !== 'GET') {
      options.body = config.body;
    }
  }
  // console.log(options);

  try {
    // console.log('Api calling');
    const response = await fetch(url, options);
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export {apiCallFn};
