import tw, {css} from 'twin.macro';
import {Icon} from './Icon';

type IconLabelProps = {right?: boolean, icon: string};

const IconStyles = ({right}: IconLabelProps) => [
  
]

// const IconLabelStyles = () => [
//   tw`rounded`
// ]

export const IconLabel: React.FC<IconLabelProps> = (props) => {
  const {right, icon, children} = props;
  return (
    <div tw="flex items-center font-medium font-content">
      <div
        tw="flex justify-center items-center"
        css={[
          css`
            font-size: 1.1em;
          `,
          right ? tw`ml-2` : tw`mr-2`
        ]}
      >
        <Icon icon={icon} />
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}