declare module 'react-native-material-textinput';

type TStatus = 'WAITING' | 'APPROVE' | 'REJECTED';

type TApproval = {
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  status: TStatus;
};

interface Attachment {
  data: Array<{
    id: number;
    attributes: {
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: number;
      height: number;
      formats: {
        large: {
          ext: string;
          url: string;
          hash: string;
          mime: string;
          name: string;
          path: string | null;
          size: number;
          width: number;
          height: number;
        };
        small: {
          ext: string;
          url: string;
          hash: string;
          mime: string;
          name: string;
          path: string | null;
          size: number;
          width: number;
          height: number;
        };
        medium: {
          ext: string;
          url: string;
          hash: string;
          mime: string;
          name: string;
          path: string | null;
          size: number;
          width: number;
          height: number;
        };
        thumbnail: {
          ext: string;
          url: string;
          hash: string;
          mime: string;
          name: string;
          path: string | null;
          size: number;
          width: number;
          height: number;
        };
      };
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: any | null;
      createdAt: string;
      updatedAt: string;
    };
  }>;
}

interface TReimburseData {
  id: number;
  type: string;
  description: string;
  amount: number;
  reimburseName: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  approval: TApproval;
}

type TReimburseForm = {
  type: string;
  description: string;
  amount: number;
  reimburseName: string;
};

type Reimburse = {
  id: string;
  type: string;
  description: string;
  amount: string;
  reimburseName: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

type Approver = {
  id: string;
  username: string;
  email: string;
  provider: string;
  password: string;
  resetPasswordToken: any;
  confirmationToken: any;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  position: string;
  tokenNotification: string;
};

type TApprovalData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  status: string;
  approver: Approver;
  reimburses: Reimburse[];
};
