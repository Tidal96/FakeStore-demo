
import { ReactNode } from "react";
import "../styles/contentgrid.css";
import Item from "./Item";
import { Card, Typography } from "@mui/material";
type contentGridProps = { title?: string; children: ReactNode };
function ContentGrid({ title = "List", children }: contentGridProps) {
  return (
    
      <main>
        <Card className="content">
          <Typography variant="h2" className="cart-header">{title}</Typography>
          <table className="content-header">
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Description</th>
            </tr>
          </table>
          {children}
        </Card>
      </main>
    
  );
}
export default ContentGrid;
