import { useEffect } from 'react';
import { Button, Text } from 'react-native';
import { useAuth0, Auth0Provider } from 'react-native-auth0';
import axios from 'axios';

const LoginButton = () => {
  const { authorize } = useAuth0();

  const onPress = async () => {
    try {
      await authorize();
    } catch (e) {
      console.log(e);
    }
  };

  return <Button onPress={onPress} title="Log in" />;
};

const LogoutButton = () => {
  const { clearSession } = useAuth0();

  const onPress = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log(e);
    }
  };

  return <Button onPress={onPress} title="Log out" />;
};

const Profile = () => {
  const { user, getCredentials } = useAuth0();

  useEffect(() => {
    console.log(user);
    (async () => {
      const token = (await getCredentials()).idToken;
      if (user) {
        console.log(
          (
            await axios.get('http://192.168.1.9:3000/api/test', {
              headers: {
                Authorization: 'Bearer ' + token,
              },
            })
          ).data
        );
      }
    })();
  }, [user]);

  return (
    <>
      {user && <Text>Logged in as {user.name}</Text>}
      {!user && <Text>Not logged in</Text>}
    </>
  );
};

const App = () => {
  return (
    <Auth0Provider
      domain={'alternata.us.auth0.com'}
      clientId={'Q4AWAUjQaRsfHSh2x52FtRkxRnitH7vQ'}
    >
      <>
        <LoginButton />
        <LogoutButton />
        <Profile />
      </>
    </Auth0Provider>
  );
};

export default App;
