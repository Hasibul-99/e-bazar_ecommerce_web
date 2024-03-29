import axios from "axios";
import Cookies from "js-cookie";

const base_url = process.env.REACT_APP_BASE;
const token = Cookies.get("expressToken") || "";

axios.defaults.headers.post['Content-Type'] = 'application/json';

/* query ---> api url to query with
   no_token ---> acts as a flag for no need to use token */
export const getData = async (query, no_token) => {
  try {
    let data = await axios.get(`${base_url}${query}`, {
      headers: no_token
        ? {}
        : {
          'x-auth-token': `${token}`,
          },
    });
    return data;
    // if (checkRes(data.status)) {
    //     // setUserProfile();
    //     return data;
    // } else {
    //     toast.error(msg_undefined);
    // }
  } catch (error) {
    // checkRes(error?.response?.status);
    // error.response?.data?.messages &&
    // typeof error.response?.data?.messages === "object"
    // ? error.response.data.messages.map((err) => {
    //     alertPop(error_status, err);
    //     })
    // : errorHandle(error);
    // return false;
  }
};

/* query ---> api url to query with
     data ---> data to be posted
     no_token ---> acts as a flag for no need to use token */
export const postData = async (query, data, no_token) => {
  try {
    console.log(`${base_url}${query}`);
    let res = await axios({
      method: "post",
      url: `${base_url}${query}`,
      headers: no_token
        ? {}
        : {
            'x-auth-token': `${token}`,
          },
      data: data,
    });

    return res;
    // if (checkRes(res?.data.status)) {
    //     // setUserProfile();
    //     return res;
    // } else {
    //     toast.error(msg_undefined);
    // }
  } catch (error) {
    console.log("error", error);
    // checkRes(error.response.status);
    // error.response && error.response.data && error.response.data.messages
    //   ? error.response.data.messages.map((err) => {
    //       // alertPop(error_status, err);
    //       console.log("err", err);
    //     })
    //   : console.log("error", error); //errorHandle(error);
    return false;
  }
};

export const putData = async (query, data, no_token) => {
  try {
    console.log(`${base_url}${query}`);
    let res = await axios({
      method: "put",
      url: `${base_url}${query}`,
      headers: no_token
        ? {}
        : {
            'x-auth-token': `${token}`,
          },
      data: data,
    });

    return res;
    // if (checkRes(res?.data.status)) {
    //     // setUserProfile();
    //     return res;
    // } else {
    //     toast.error(msg_undefined);
    // }
  } catch (error) {
    console.log("error", error);
    // checkRes(error.response.status);
    // error.response && error.response.data && error.response.data.messages
    //   ? error.response.data.messages.map((err) => {
    //       // alertPop(error_status, err);
    //       console.log("err", err);
    //     })
    //   : console.log("error", error); //errorHandle(error);
    return false;
  }
};

// const setUserProfile = async () => {
//   try {
//     let res = await axios({
//       method: "post",
//       url: `${base_url}${ME}`,
//       headers: {
//         Authorization: `bearer ${token}`,
//       },
//       data: {},
//     });

//     if (res?.data?.status_code && checkRes(res.data.status_code)) {
//       window.localStorage.setItem("profile", JSON.stringify(res.data));
//     }
//   } catch (error) {
//     console.log("error", error);
//   }
// };

export const deleteData = async (query, no_token) => {
  try {
    let data = await axios.delete(`${base_url}${query}`, {
      headers: no_token
        ? {}
        : {
          'x-auth-token': `${token}`,
          },
    });
    return data;
    // if (checkRes(data.status)) {
    //     // setUserProfile();
    //     return data;
    // } else {
    //     toast.error(msg_undefined);
    // }
  } catch (error) {
    // checkRes(error?.response?.status);
    // error.response?.data?.messages &&
    // typeof error.response?.data?.messages === "object"
    // ? error.response.data.messages.map((err) => {
    //     alertPop(error_status, err);
    //     })
    // : errorHandle(error);
    // return false;
  }
};
