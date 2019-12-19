export const defaults = {
  isLoggedIn: Boolean(localStorage.getItem("jjchat-token")) || false
};

export const resolvers = {
  Mutation: {
    logUserIn: (_, { token }, { cache }) => {
      localStorage.setItem("jjchat-token", token);
      cache.writeData({
        data: {
          isLoggedIn: true
        }
      });
      window.location.reload();
      window.location = "/";
      return null;
    },
    logUserOut: (_, __, { cache }) => {
      localStorage.removeItem("jjchat-token");
      window.location = "/";
      return null;
    }
  }
};
