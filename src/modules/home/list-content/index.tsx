import {Layout} from '@components';
import React from 'react';
import {WidgetLandingPage} from '../landing-page/components';
import {WidgetListContent} from './components';
import {useListComponent} from './logic/useListComponent';

const ListContent = ({route}: any) => {
  const params = route.params;

  const {
    dataApprovalState,
    dataReimburseState,
    isAdmin,
    _navigateToDetailReimburse,
  } = useListComponent({
    titleContent: params?.contentName,
    dataApproval: params?.dataApproval,
    dataReimburse: params?.dataReimburse,
  });

  return (
    <Layout>
      <WidgetListContent.WidgetHeader titleContent={params.contentName} />
      {isAdmin ? (
        <WidgetLandingPage.WidgetAdminListApproval
          data={dataApprovalState}
          withTitle={false}
        />
      ) : (
        <WidgetLandingPage.History
          data={dataReimburseState}
          withTitle={false}
          handleClickItem={_navigateToDetailReimburse}
        />
      )}
    </Layout>
  );
};

export default ListContent;
