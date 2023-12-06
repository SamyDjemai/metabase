import { t } from "ttag";
import { useCallback, useEffect, useState } from "react";

import { Stack, Title, Text, Button, Group } from "metabase/ui";

import Breadcrumbs from "metabase/components/Breadcrumbs";
import { ApiKeysApi } from "metabase/services";
import { Icon } from "metabase/core/components/Icon";

import { CreateApiKeyModal } from "./CreateApiKeyModal";
import { EditApiKeyModal } from "./EditApiKeyModal";
import { DeleteApiKeyModal } from "./DeleteApiKeyModal";

// TODO: add type for apikey rows

export const ManageApiKeys = () => {
  const [keyRows, setKeyRows] = useState<null | any[]>(null);
  const [modal, setModal] = useState<null | "create" | "edit" | "delete">(null);
  const [activeRow, setActiveRow] = useState(null);

  const refreshList = useCallback(() => {
    ApiKeysApi.list().then(setKeyRows);
  }, []);

  const handleClose = () => setModal(null);

  useEffect(() => {
    refreshList();
  }, [refreshList]);

  // TODO: Display <LoadingAndErrorWrapper isLoading={} error={}>

  const isTableEmpty = keyRows?.length === 0;

  return (
    <>
      {modal === "create" ? (
        <CreateApiKeyModal onClose={handleClose} refreshList={refreshList} />
      ) : modal === "edit" ? (
        <EditApiKeyModal
          onClose={handleClose}
          refreshList={refreshList}
          activeRow={activeRow}
        />
      ) : modal === "delete" ? (
        <DeleteApiKeyModal
          activeRow={activeRow}
          onClose={handleClose}
          refreshList={refreshList}
        />
      ) : null}
      <Stack pl="md" spacing="lg">
        <Breadcrumbs
          crumbs={[
            [t`Authentication`, "/admin/settings/authentication"],
            [t`API Keys`],
          ]}
        />
        <Group align="end" position="apart">
          <Stack>
            <Title>{t`Manage API Keys`}</Title>
            {!isTableEmpty && (
              <Text color="text.1">{t`Allow users to use the API keys to authenticate their API calls.`}</Text>
            )}
          </Stack>
          <Button
            variant="filled"
            onClick={() => setModal("create")}
          >{t`Create API Key`}</Button>
        </Group>
        <table className="ContentTable border-bottom">
          <thead>
            <tr>
              <th>{t`Key name`}</th>
              <th>{t`Group`}</th>
              <th>{t`Key`}</th>
              <th>{t`Last Modified By`}</th>
              <th>{t`Last Modified On`}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {keyRows?.map(row => (
              <tr key={row.id} className="border-bottom">
                <td className="text-bold">{row.name}</td>
                <td>{row.group_id}</td>
                <td>{row.masked_key}</td>
                <td>{row.creator_id}</td>
                <td>{row.updated_at}</td>
                <td>
                  <Group spacing="md">
                    <Icon
                      name="pencil"
                      onClick={() => {
                        setActiveRow(row);
                        setModal("edit");
                      }}
                      className="cursor-pointer"
                    />
                    <Icon
                      name="trash"
                      onClick={() => {
                        setActiveRow(row);
                        setModal("delete");
                      }}
                      className="cursor-pointer"
                    />
                  </Group>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isTableEmpty && (
          <Stack h="40rem" align="center" justify="center" spacing="sm">
            <Title>{t`No API keys here yet`}</Title>
            <Text color="text.1">{t`Create API keys to programmatically authenticate their API calls.`}</Text>
          </Stack>
        )}
      </Stack>
    </>
  );
};