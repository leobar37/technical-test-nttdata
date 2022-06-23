import styled from "@emotion/styled";
import { FC, ReactNode } from "react";
import { getToken } from "@App/utils";

export const TableWrapper = styled.table`
  border-collapse: collapse;
  border: 2px solid ${getToken("colors.gray.300")};
  background: ${getToken("colors.white")};
  th,
  td {
    padding: 0.5rem 1rem;
    border: 2px solid ${getToken("colors.gray.300")};
  }
  th {
    font-weight: 700;
  }
  td {
    font-weight: 300;
  }
  width: 100%;
`;

export const Table: FC<{ children: ReactNode }> = ({ children }) => {
  return <TableWrapper>{children}</TableWrapper>;
};
