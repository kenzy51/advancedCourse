import path from "path";
import { BuildOptions } from "./types/config";
import webpack from 'webpack';
import { buildPlagins } from "./buildPlugins";
import { buildLoaders } from "./buildLoaders";
import { buildResolver } from "./buildResolvers";
import { buildDevServer } from "./buildDevServer";
export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
  const { paths, mode, isDev } = options;

  return {
    mode,
    entry: paths.entry,
    output: {
      filename: '[name].[contenthash].js',
      path: paths.build,
      clean: true,
    },
    plugins: buildPlagins(options),
    module: {
      rules: buildLoaders(),
    }, 
    resolve: buildResolver(),
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? buildDevServer(options) : undefined
  }
}