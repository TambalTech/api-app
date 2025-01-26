import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
providers: [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "Credentials",
    credentials: {},
    async authorize(credentials, req) {
      // Add logic here to look up the user from the credentials supplied
      // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
      const res = await fetch(process.env.JWT_BASE_URL+'token', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "application/json" }
      })
      const user = await res.json()
     


      if (user.token) {
        // Any object returned will be saved in `user` property of the JWT
        const loginUser = {
          name: user.user_display_name, 
          email: user.user_email,
          token: user.token,
        };
       
        return loginUser
        
      } else {
        // If you return null then an error will be displayed advising the user to check their details.
        return null

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      }
      console.log(loginUser);
    }
  })
  
],
callbacks: {
  async jwt({ token, user, account, profile, isNewUser  }) {
    // Persist the OAuth access_token and or the user id to the token right after signin
    if (user) {
      token.accessToken = user.token
      
    }
    return token
  },
  async session({ session, token, user }) {
    // Send properties to the client, like an access_token and user id from a provider.
    if(token){
    session.user.accessToken = token.accessToken
  }
      return session
  }
},
pages:{
  signIn :'/Login',
}

})

export { handler as GET, handler as POST }