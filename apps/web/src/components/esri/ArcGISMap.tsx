'use client';

import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import { ArcgisTrack } from '@arcgis/map-components/components/arcgis-track';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { BarChart3, Table2 } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { EsriData, esriOutFields, EsriSeason, isAllSeasons, seasonOptions } from '@/model/esri';

import { EsriBar } from './EsriBar';
import { EsriPie } from './EsriPie';
import { EsriTable } from './EsriTable';

const defaultSeason: EsriSeason = '';

interface ArcGISMapProps {
  searchTerm?: string;
}

const track = new ArcgisTrack();
track.goToOverride = function (view, goToParams) {
  goToParams.options = {
    duration: 1000,
  };
  return view.goTo(goToParams.target, goToParams.options);
};

type Tab = 'table' | 'chart';
export default function ArcGISMap({ searchTerm = '' }: ArcGISMapProps) {
  const [selectedSeason, setSelectedSeason] = useState<EsriSeason>(defaultSeason);
  const [output, setOutput] = useState<EsriData[]>([]);

  const [activeTab, setActiveTab] = useState<Tab>('table');
  const mapDiv = useRef<HTMLDivElement>(null);
  const mapviewRef = useRef<MapView | null>(null);
  const webmapRef = useRef<WebMap | null>(null);

  const queryMap = useCallback((season: EsriSeason, searchTerm: string) => {
    setSelectedSeason(season);
    if (!webmapRef.current) return;

    for (const layer of webmapRef.current.layers) {
      if (layer.type === 'feature') {
        const featureLayer = layer as FeatureLayer;
        featureLayer.when(() => {
          let queryWhere = '';
          if (!isAllSeasons(season)) {
            queryWhere = `Crop_Name LIKE '%${searchTerm}%' AND Season = '${season}'`;
          } else {
            queryWhere = `Crop_Name LIKE '%${searchTerm}%'`;
          }

          const outFields = esriOutFields;

          featureLayer.definitionExpression = queryWhere;
          featureLayer.outFields = outFields;
          featureLayer
            .queryFeatures({
              where: queryWhere,
              outFields,
              returnGeometry: false,
            })
            .then((results: { features: { attributes: EsriData }[] }) => {
              const data = results.features.map((f) => f.attributes);
              setOutput(data);
            });
        });
      }
    }
  }, []);

  useEffect(() => {
    if (mapDiv.current) {
      const webmap = new WebMap({
        portalItem: {
          id: 'cb01c55697d94abca1e8f04ec294f984',
        },
      });

      const view = new MapView({
        container: mapDiv.current,
        map: webmap,
        center: [-79.4163, 43.70011],
        zoom: 4,
        ui: {
          components: ['zoom', 'compass'],
        },
        constraints: {
          minZoom: 4,
        },
      });

      webmapRef.current = webmap;
      mapviewRef.current = view;

      mapviewRef.current.when(() => {
        queryMap(defaultSeason, '');
        view.ui.add(track, 'bottom-trailing');
      });
    }

    return () => {
      mapviewRef.current?.destroy();
      webmapRef.current?.destroy();
    };
  }, [mapDiv, queryMap]);

  useEffect(() => {
    queryMap(selectedSeason, searchTerm);
  }, [selectedSeason, searchTerm, queryMap]);

  return (
    <>
      <h2 className="text-2xl font-bold my-6 text-center">
        Supply Map {selectedSeason ? `- ${selectedSeason}` : ''}{' '}
        {searchTerm ? `"${searchTerm.replace(/^\w/, (c) => c.toUpperCase())}"` : ''}
      </h2>

      <div className="px-2 grid grid-cols-3 xl:flex justify-center mb-6 gap-2 xl:gap-4">
        {seasonOptions.map((season) => (
          <button
            key={season}
            aria-selected={season === selectedSeason}
            onClick={() => setSelectedSeason(season)}
            className={cn(
              'px-4 py-2 rounded-md hover:bg-primary hover:text-white shadow-neumorphic ease-in-out duration-500 min-w-32',
              season === selectedSeason && '!bg-primary text-white'
            )}
          >
            {season === '' ? 'All' : season}
          </button>
        ))}
      </div>
      <div className="flex min-w-full flex-col xl:flex-row xl:h-[600px] w-full gap-14">
        <div ref={mapDiv} className="min-h-[500px] w-full xl:w-1/2" />
        <div className="mx-auto w-9/10 xl:w-1/2">
          <Tabs
            defaultValue="table"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as Tab)}
            className="w-full h-full flex flex-col"
          >
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger
                value="table"
                className={cn(
                  'flex items-center gap-2 p-2 justify-center rounded-t-md',
                  activeTab === 'table' && '!bg-primary text-white [&_svg]:stroke-white'
                )}
              >
                <Table2 className="h-4 w-4" />
                Table View
              </TabsTrigger>
              <TabsTrigger
                value="chart"
                className={cn(
                  'flex items-center gap-2 p-2 rounded-t-md justify-center',
                  activeTab === 'chart' && '!bg-primary text-white [&_svg]:stroke-white'
                )}
              >
                <BarChart3 className="h-4 w-4" />
                Chart View
              </TabsTrigger>
            </TabsList>
            <TabsContent value="table">
              <EsriTable data={output} />
            </TabsContent>
            <TabsContent value="chart" className="flex flex-1">
              <div className="flex gap-4 items-center mb-14 mx-auto">
                <EsriBar data={output} className="h-80" />
                <EsriPie data={output} className="h-80" />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

// export default function ArcGISMap() {
//   const mapRef = useRef<HTMLDivElement>(null);
//   const featureRef = useRef<__esri.Graphic | null>(null);

//   useEffect(() => {
//     if (!mapRef.current) return;

//     const webmap = new WebMap({
//       portalItem: {
//         id: 'cb01c55697d94abca1e8f04ec294f984', // 👉 替換為你的 WebMap ID
//       },
//     });

//     const view = new MapView({
//       container: mapRef.current,
//       map: webmap,
//       center: [-100, 55],
//       zoom: 4,
//     });

//     view.when(() => {
//       const featureLayer = webmap.layers.getItemAt(0) as FeatureLayer;
//       featureLayer.outFields = ['*'];

//       const defaultGraphic = new Graphic({
//         popupTemplate: {
//           content: 'Mouse over features to show details...',
//         },
//       });

//       // 儲存目前顯示的 feature
//       featureRef.current = defaultGraphic;
//     });

//     return () => {
//       view?.destroy();
//     };
//   }, []);
//   return (
//     <>
//       <h2 className="text-xl font-bold text-center mb-4">Canada Agriculture Map</h2>
//       <ArcgisMap
//         itemId="cb01c55697d94abca1e8f04ec294f984"
//         style={{ height: '600px', width: '100%' }}
//         center={[-106.3468, 56.1304]}
//         zoom={3}
//       >
//         <arcgis-zoom position="top-left"></arcgis-zoom>
//         <arcgis-track position="top-left"></arcgis-track>
//       </ArcgisMap>
//     </>
//   );
// }
