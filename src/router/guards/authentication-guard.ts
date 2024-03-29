import { useUserStore } from '@/stores/user.store';

export default async function authenticationGuard() {
  const userStore = useUserStore();

  if (userStore.state.user.id) {
    return true;
  } else if (localStorage.getItem('jwt')) {
    await userStore.getMyInfo();

    if (userStore.state.user.id) {
      return true;
    }
  }

  return false;
}
