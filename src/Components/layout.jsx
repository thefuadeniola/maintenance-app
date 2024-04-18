import '../App.css'
import SideNav from "./SideNav";
import TopNav from './TopNav'


export default function RootLayout() {
  return (
    <html lang="en">
        <body>
            <SideNav />
            <TopNav />
        </body>
    </html>
  );
}
