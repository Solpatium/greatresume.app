import styled from "styled-components";

const Text = styled.span`
  display: block;
  color: #525974;
  font-weight: 700;
  margin-bottom: 3px;
  letter-spacing: 0.6px;
`;

const Wrapper = styled.label`
  display: block;
`;

export const Label: React.FC<{
  name?: string;
  className?: string;
}> = ({ className, name, children }) => (
  <Wrapper className={className}>
    <Text>{name}</Text>
    {children}
  </Wrapper>
);
