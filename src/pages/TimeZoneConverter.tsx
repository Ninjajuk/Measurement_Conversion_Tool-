import { useState, useEffect } from "react";
import moment from "moment-timezone";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const TimeZoneConverter: React.FC = () => {
  const [sourceTime, setSourceTime] = useState<string>("");
  const [sourceZone, setSourceZone] = useState<string>(moment.tz.guess());
  const [targetZone, setTargetZone] = useState<string>("UTC");
  const [convertedTime, setConvertedTime] = useState<string>("");

  const timeZones: string[] = moment.tz.names();

  useEffect(() => {
    if (sourceTime) {
      convertTime();
    }
  }, [sourceTime, sourceZone, targetZone]);

  const convertTime = (): void => {
    if (!sourceTime) return;
    const converted: string = moment
      .tz(sourceTime, "HH:mm", sourceZone)
      .tz(targetZone)
      .format("HH:mm");
    setConvertedTime(converted);
  };

  return (
      <div className="container mx-auto px-4 pt-24 pb-12 min-h-screen flex flex-col items-center">
          <div className="max-w-2xl w-full flex flex-col gap-2">
              <Card className=" p-6 rounded-lg shadow-md w-full max-w-md mx-auto transition-transform hover:scale-105">
                  <h2 className="text-xl font-semibold mb-4">Time Zone Converter</h2>

                  {/* Source Time Input */}
                  <Input
                      type="time"
                      value={sourceTime}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setSourceTime(e.target.value)
                      }
                      className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />

                  {/* Source Time Zone Dropdown */}
                  <select
                      value={sourceZone}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          setSourceZone(e.target.value)
                      }
                      className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-primary text-gray-700"
                  >
                      {timeZones.map((zone) => (
                          <option key={zone} value={zone} className="text-gray-700">
                              {zone}
                          </option>
                      ))}
                  </select>

                  {/* Target Time Zone Dropdown */}
                  <select
                      value={targetZone}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          setTargetZone(e.target.value)
                      }
                      className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-primary text-gray-700"
                  >
                      {timeZones.map((zone) => (
                          <option key={zone} value={zone} className="text-gray-700">
                              {zone}
                          </option>
                      ))}
                  </select>

                  {/* Converted Time Display */}
                  {convertedTime && (
                      <div className="mt-4 text-center">
                          <h3 className="text-lg font-semibold">
                              Converted Time: <span className="text-primary">{convertedTime}</span>
                          </h3>
                      </div>
                  )}
              </Card>
          </div>
      </div>
  );
};

export default TimeZoneConverter;
