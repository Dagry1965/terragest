$FeatureRegistry = @{

    Crud = @{

        Templates = @(
            "query-hook",
            "create-mutation",
            "update-mutation",
            "delete-mutation",
            "filters",
            "pagination",
            "sorting",
            "bulk-actions",
            "export-actions",
            "list-page",
            "new-page",
            "details-page",
            "edit-page",
            "form",
            "table"
        )
    }

    Tests = @{

        Templates = @(
            "test"
        )
    }

    Realtime = @{

        Templates = @(
            "realtime-widget",
            "realtime-listener"
        )
    }

    Offline = @{

        Templates = @(
            "offline-queue",
            "indexeddb-storage"
        )
    }

    Dashboard = @{

        Templates = @(
            "dashboard-card",
            "chart-widget"
        )
    }
}