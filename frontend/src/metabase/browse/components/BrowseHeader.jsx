/* eslint-disable react/prop-types */
import { t } from "ttag";

import BrowserCrumbs from "metabase/components/BrowserCrumbs";
import { Icon } from "metabase/ui";
import Link from "metabase/core/components/Link";

import {
  BrowseHeaderContent,
  BrowseHeaderRoot,
  BrowserHeaderIconContainer,
} from "./BrowseHeader.styled";

export default function BrowseHeader({ crumbs }) {
  return (
    <BrowseHeaderRoot>
      <BrowseHeaderContent>
        <BrowserCrumbs crumbs={crumbs} />
        <div className="flex flex-align-right">
          <Link className="flex flex-align-right" to="reference">
            <BrowserHeaderIconContainer>
              <Icon className="flex align-center" size={14} name="reference" />
              <span className="ml1 flex align-center text-bold">
                {t`Learn about our data`}
              </span>
            </BrowserHeaderIconContainer>
          </Link>
        </div>
      </BrowseHeaderContent>
    </BrowseHeaderRoot>
  );
}
