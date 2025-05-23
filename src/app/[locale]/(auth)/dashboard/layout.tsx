import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { DashboardHeader } from '@/features/dashboard/DashboardHeader';
import { Env } from '@/libs/Env';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Dashboard',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function DashboardLayout(props: { children: React.ReactNode }) {
  const t = useTranslations('DashboardLayout');
  const organizationEnabled = Env.NEXT_PUBLIC_ORGANIZATION_ENABLED === 'true';

  const menuItems = [];

  if (organizationEnabled) {
    menuItems.push(
      {
        href: '/dashboard',
        label: t('home'),
      },
      {
        href: '/dashboard/organization-profile/organization-members',
        label: t('members'),
      },
      {
        href: '/dashboard/organization-profile',
        label: t('settings'),
      },
    );
  }

  // 可以添加其他菜单项
  // menuItems.push({
  //   href: '/dashboard/billing',
  //   label: t('billing'),
  // });

  return (
    <>
      <div className="shadow-md">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between px-3 py-4">
          <DashboardHeader menu={menuItems} />
        </div>
      </div>

      <div className="min-h-[calc(100vh-72px)] bg-muted">
        <div className="mx-auto max-w-screen-xl px-3 pb-16 pt-6">
          {props.children}
        </div>
      </div>
    </>
  );
}

export const dynamic = 'force-dynamic';
