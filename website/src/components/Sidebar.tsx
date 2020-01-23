import React, {
  useContext,
  Fragment,
  PropsWithChildren,
  useState
} from 'react';
import {
  ListItemLabel,
  MenuAdapter,
  ARTWORK_SIZES,
  ListItem
} from 'baseui/list';
import { useStyletron } from 'baseui';
import { Drawer, ANCHOR, SIZE } from 'baseui/drawer';
import { StatefulMenu } from 'baseui/menu';
import { ChevronRight } from 'baseui/icon';
import AuthContext from '../context/auth/AuthContext';

export default function Menu(props: any) {
  const { isOpen, setIsOpen } = props;
  //const [isOpen, setIsOpen] = useState(false);
  const { logout } = useContext(AuthContext);

  function handleSelect({ item }: any) {
    if (item.option === 'Log Out') {
      logout();
      //props.history.push('/login');
    }
  }
  return (
    <Drawer
      anchor={ANCHOR.left}
      isOpen={isOpen}
      autoFocus
      onClose={() => setIsOpen(false)}
    >
      <StatefulMenu
        items={[
          { option: 'My List' },
          { option: 'Favorites' },
          { option: 'Settings' },
          { option: 'Log Out' }
        ]}
        onItemSelect={handleSelect}
        overrides={{
          List: {
            style: {
              height: '60%',
              width: '100%',
              paddingLeft: 0,
              paddingRight: 0,
              border: 'none',
              boxShadow: 'none',
              ':focus': {
                border: 'none'
              }
            }
          },

          Option: {
            props: {
              overrides: {
                ListItem: {
                  component: React.forwardRef((props: any, ref) => (
                    <MenuAdapter
                      {...props}
                      ref={ref}
                      // artwork={props.item.icon}
                      // artworkSize={ARTWORK_SIZES.LARGE}
                      // endEnhancer={() => <ChevronRight />}
                    >
                      <ListItemLabel>{props.item.option}</ListItemLabel>
                    </MenuAdapter>
                  ))
                }
              }
            }
          }
        }}
      />

      {/* <MenuItems /> */}
    </Drawer>
  );
}

// function MenuItems() {
//   const options = ['My List', 'Favorites', 'Settings', 'Log Out'];
//   const [css] = useStyletron();
//   return (
//     <ul
//       className={css({
//         width: '375px',
//         paddingLeft: 0,
//         paddingRight: 0
//       })}
//     >
//       {options.map(option => (
//         <ListItem
//           key={option}
//           artworkSize={ARTWORK_SIZES.SMALL}
//           overrides={{
//             EndEnhancerContainer: {
//               style: ({ $theme }) => {
//                 return {};
//               }
//             },
//             ArtworkContainer: {
//               style: ({ $theme }) => {
//                 return {};
//               }
//             },
//             Root: {
//               style: {
//                 ':hover': {
//                   backgroundColor: '#E2E2E2'
//                 }
//               }
//             },
//             Content: {
//               style: ({ $theme }) => {
//                 return {};
//               }
//             }
//           }}
//         >
//           <div
//             style={{
//               width: '100%',
//               height: '100%',
//               display: 'flex',
//               alignItems: 'center'
//             }}
//           >
//             <ListItemLabel>{option}</ListItemLabel>
//           </div>
//         </ListItem>
//       ))}
//     </ul>
//   );
// }
