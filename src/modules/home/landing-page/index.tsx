import {Layout} from '@components';
import React from 'react';
import {Animated, RefreshControl, ScrollView} from 'react-native';
import {capitalize} from 'src/utils/scripts/capitalize';

import {WidgetLandingPage} from './components';
import {useLandingPage} from './logic/useLandingPage';

const LandingPage = () => {
  const {
    menu,
    dataReimburse,
    user_data,
    loading,
    dataApproval,
    isVisibleModal,
    dataReimburseAccepted,
    _handleScrollBegin,
    _handleScrollEnd,
    _navigateToDetailReimburse,
    _handleLogout,
    _handleCloseModal,
    _handleClickProfile,
    _getDataReimbursement,
    _getDataApproval,
    _navigateCamera,
    _navigateListContent,
  } = useLandingPage();

  const isUserRole = user_data?.user?.role?.name === 'Users';

  return (
    <Layout>
      <ScrollView
        onScrollBeginDrag={_handleScrollBegin}
        onScrollEndDrag={_handleScrollEnd}
        onMomentumScrollEnd={_handleScrollEnd}
        refreshControl={
          <RefreshControl
            onRefresh={isUserRole ? _getDataReimbursement : _getDataApproval}
            refreshing={loading}
          />
        }
        nestedScrollEnabled={true}>
        <WidgetLandingPage.Header
          handleClickProfile={_handleClickProfile}
          name={capitalize(user_data?.user?.full_name)}
          position={user_data?.user?.position}
        />
        {isUserRole && (
          <WidgetLandingPage.Card
            data={dataReimburseAccepted}
            isLoading={loading}
          />
        )}
        {/* <WidgetLandingPage.Draft data={dataReimburseArchived} /> */}
        <WidgetLandingPage.Category
          dataApproval={dataApproval}
          dataReimburse={dataReimburse}
          menu={menu}
          handleNavigate={_navigateListContent}
        />

        {isUserRole ? (
          <WidgetLandingPage.History
            data={dataReimburse}
            handleClickItem={_navigateToDetailReimburse}
          />
        ) : (
          <WidgetLandingPage.WidgetAdminListApproval data={dataApproval} />
        )}
      </ScrollView>
      {isUserRole && <WidgetLandingPage.AddButton onPress={_navigateCamera} />}
      <WidgetLandingPage.ModalProfile
        handleLogout={_handleLogout}
        handleCloseModal={_handleCloseModal}
        isVisible={isVisibleModal}
        name={capitalize(user_data?.user?.username)}
        position={user_data?.user?.position}
      />
    </Layout>
  );
};

export default LandingPage;
