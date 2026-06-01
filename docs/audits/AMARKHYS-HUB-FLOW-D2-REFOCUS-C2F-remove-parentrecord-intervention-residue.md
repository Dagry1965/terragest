# AMARKHYS-HUB-FLOW-D2-REFOCUS-C2F — Remove parentRecord intervention residue

Target: `src\components\erp\hub\ERPClientOperationalSheet.tsx`
Backup: `src\components\erp\hub\ERPClientOperationalSheet.tsx.bak-c2f-remove-parentrecord-intervention-residue`

## Removed block

```tsx
                                {isSelected ? (
                                  <div className="border-t border-emerald-100 bg-white/80 p-4">
                                    <ERPRelatedRecordsPanel
                                      parentModule={interventionsautoModule}
                                      parentRecord={intervention}
                                      child={lignesInterventionChild}
                                      mode="detail"
                                    />
                                  </div>
                                ) : null}
                              </div>
                            );
                          })}
```

## Checks

- OK — component changed
- OK — orphan parentRecord removed
- OK — orphan child lignes removed
- OK — compact table marker preserved
- OK — interventions list preserved
- OK — fallback preserved
- OK — factures downstream preserved
- OK — encaissements downstream preserved
- OK — rdv block preserved
- OK — intervention block preserved

OK: 10
FAIL: 0
